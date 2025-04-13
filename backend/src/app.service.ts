import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import * as PDFDocument from 'pdfkit';
import { Response } from 'express';
import * as path from 'path';
import { formatDateTime } from './../helpers/formatDate';
import { formatPrice } from './../helpers/formatPrice';

@Injectable()
export class AppService {
  constructor(private readonly DatabaseService: DatabaseService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async downloadPDF(res: Response, orders: any) {
    const { orderId } = orders;

    try {
      const order = await this.DatabaseService.order.findUnique({
        where: { id: orderId },
        select: {
          id: true,
          user: {
            select: {
              email: true,
              profile: true,
            },
          },
          status: true,
          invoiceNo: true,
          discount: true,
          OrderDetails: {
            include: {
              product: true,
            },
          },
          OrderImage: true,
          total: true,
          createdAt: true,
        },
      });

      const doc = new PDFDocument({ size: 'A4', margin: 50 });

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');

      doc.pipe(res);

      const fontPathRegular = path.join(
        __dirname,
        '..',
        'assets',
        'THSarabunNew.ttf',
      );
      const fontPathBold = path.join(
        __dirname,
        '..',
        'assets',
        'Sarabun-Bold.ttf',
      );
      const fontPathSemiBold = path.join(
        __dirname,
        '..',
        'assets',
        'Sarabun-SemiBold.ttf',
      );

      doc.registerFont('THSarabun', fontPathRegular);
      doc.registerFont('THSarabun-Bold', fontPathBold);
      doc.registerFont('THSarabun-Semi-Bold', fontPathSemiBold);

      doc.strokeColor('red').rect(50, 40, 500, 2).stroke();

      // หัวเอกสาร
      doc
        .fontSize(18)
        .font('THSarabun-Semi-Bold')
        .text('แดร็กคูล่า สโตร์', { align: 'left' });

      doc
        .font('THSarabun')
        .fontSize(16)
        .text('เลขที่ 39/37 หมู่บ้านเต็มสิริแกรน์', 50, 80, {
          lineGap: 0,
        })
        .text('ถนนสามวา แขวงบางชัน กรุงเทพฯ 10500')
        .text('support@dracula.com | 080-4252-679');

      doc
        .fontSize(16)
        .text('ใบเสร็จรับเงิน/ใบกำกับภาษี', 400, 50)
        .text(`วันที่: ${formatDateTime(order?.createdAt)}`, 400, 70)
        .text('หน้า 1 / 1')
        .text('เอกสารออกเป็นชุด');

      doc.moveDown();

      // ข้อมูลที่จัดส่ง
      doc
        .fontSize(14)
        .font('THSarabun-Semi-Bold')
        .text('สถานที่จัดส่ง:', 50, 165);

      doc
        .font('THSarabun')
        .fontSize(16)
        .text(
          `ชื่อผู้รับสินค้า: ${order?.user?.profile?.[0]?.firstname} ${''} ${order?.user?.profile?.[0]?.lastname}`,
          50,
          190,
        );

      doc.text(`ที่อยู่: ${order?.user?.profile?.[0]?.address}`, 50, 210, {
        width: 350,
        lineBreak: true,
      });

      doc.strokeColor('red').rect(50, 298, 500, 2).stroke();

      // รายการสินค้า
      doc
        .fontSize(16)
        .font('THSarabun-Semi-Bold')
        .text(`หมายเลขออเดอร์: #${order?.invoiceNo}`, 50, 250);

      doc
        .fontSize(16)
        .font('THSarabun')
        .text('ประเภทการชำระเงิน : ชำระเงินด้วย QR', 50, undefined, {
          align: 'left',
        });

      const startY = 310;
      let currentY = startY;

      // หัวตาราง
      doc
        .font('THSarabun-Semi-Bold')
        .fontSize(14)
        .text('รายการสินค้า', 50, currentY)
        .text('จำนวน', 340, currentY)
        .text('ราคาต่อหน่วย', 400, currentY)
        .text('รวม', 510, currentY);

      currentY += 25;

      const orderDetails = order?.OrderDetails;

      // วนลูปแสดงข้อมูลรายการสินค้า
      orderDetails?.forEach((item, index) => {
        doc.font('THSarabun').fontSize(14);

        const productName = `${index + 1}) ${item?.product?.name}`;
        const productNameHeight = doc.heightOfString(productName, {
          width: 290,
          lineGap: 0.5,
        });

        doc
          .text(productName, 50, currentY, {
            width: 290,
            lineGap: 0.5,
          })
          .text(item?.quantity, 360, currentY)
          .text(`${formatPrice(item?.price)} บาท`, 420, currentY)
          .text(`${formatPrice(item?.subtotal)}`, 500, currentY);

        currentY += productNameHeight + 10;
      });

      // รวมยอด
      doc.moveDown();
      doc.moveDown();

      const realTotal = order?.OrderDetails?.reduce(
        (sum, curr) => sum + (curr?.subtotal || 0),
        0,
      );

      const discountRate = order?.discount?.discount || 0;
      const totalDiscount = ((realTotal || 0) * discountRate) / 100;

      doc
        .fontSize(16)
        .text(`รวมทั้งหมด: ${formatPrice(realTotal)} บาท`, 345, undefined, {
          width: 200,
          align: 'right',
        })
        .text(
          `ส่วนลด ${order?.discount !== null ? order?.discount?.code : `ไม่มีการใช้ส่วนลด`} : ${formatPrice(totalDiscount)} บาท`,
          345,
          undefined,
          {
            width: 200,
            align: 'right',
          },
        )
        .text(
          `ยอดชำระสุทธิ: ${formatPrice(order?.total)} บาท`,
          345,
          undefined,
          {
            width: 200,
            align: 'right',
          },
        );

      doc.end();
    } catch (error) {
      console.error('PDF Generation Error:', error);
      res.status(500).send('Failed to generate PDF');
    }
  }
}

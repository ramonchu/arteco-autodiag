import { NextRequest, NextResponse } from 'next/server';
import PDFDocument from 'pdfkit/js/pdfkit.standalone.js';
import { generateRecommendations, Answers } from '@/lib/recommendations';
import { questions } from '@/app/diagnostico/questions';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const insightParam = searchParams.get('insight');
  if (!insightParam) {
    return new NextResponse('Missing insight', { status: 400 });
  }

  let data: { answers: Answers };
  try {
    data = JSON.parse(insightParam);
  } catch {
    return new NextResponse('Invalid insight', { status: 400 });
  }

  const recommendations = generateRecommendations(data.answers);

  const doc = new PDFDocument({ margin: 50 });
  const buffers: Buffer[] = [];
  doc.on('data', (b) => buffers.push(b));

  doc.fontSize(20).text('Resultados del Diagnóstico', { align: 'center' });
  doc.moveDown();

  const questionMap = new Map(questions.map((q) => [q.id, q.question]));

  Object.entries(data.answers).forEach(([id, answer]) => {
    const questionText = questionMap.get(id) || id;
    doc.fontSize(12).text(`${questionText}: ${answer}`);
  });

  doc.moveDown();
  doc.fontSize(16).text('Recomendaciones', { underline: true });
  doc.moveDown(0.5);
  recommendations.forEach((rec) => {
    doc.fontSize(12).text('• ' + rec);
    doc.moveDown(0.5);
  });

  doc.moveDown();
  doc.fontSize(10).text('Arteco Consulting SL - Soluciones en transformación digital y plataformas ágiles.', { align: 'center' });

  doc.end();

  const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', reject);
  });

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="diagnostico.pdf"',
    },
  });
}

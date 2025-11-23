import { NextApiRequest, NextApiResponse } from 'next';
import { MercadoPagoConfig, Payment } from 'mercadopago';

// Inicializa o Mercado Pago com o Access Token
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
});

const payment = new Payment(client);

// Dados de pacotes de ManusCoins (Mock Data)
const packages = [
  { id: 'package_1', name: '1.000 ManusCoins', price: 1000, amount: 1000 }, // Preço em centavos (R$ 10,00)
  { id: 'package_2', name: '5.500 ManusCoins', price: 4500, amount: 5500 }, // Preço em centavos (R$ 45,00)
  { id: 'package_3', name: '12.000 ManusCoins', price: 9000, amount: 12000 }, // Preço em centavos (R$ 90,00)
  { id: 'package_4', name: '25.000 ManusCoins', price: 18000, amount: 25000 }, // Preço em centavos (R$ 180,00)
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { packageId, userId, userEmail } = req.body;

  if (!packageId || !userId || !userEmail) {
    return res.status(400).json({ error: 'Missing packageId, userId, or userEmail' });
  }

  const selectedPackage = packages.find(p => p.id === packageId);

  if (!selectedPackage) {
    return res.status(404).json({ error: 'Package not found' });
  }

  // O Mercado Pago trabalha com valores em Reais (R$)
  const totalAmount = selectedPackage.price / 100; // Converte de centavos para Reais

  const paymentData = {
    transaction_amount: totalAmount,
    description: selectedPackage.name,
    payment_method_id: 'pix',
    payer: {
      email: userEmail,
    },
    external_reference: userId, // Usar o ID do usuário como referência externa
  };

  try {
    const paymentResponse = await payment.create({ body: paymentData });

    if (paymentResponse.status === 'pending') {
      return res.status(200).json({
        status: 'pending',
        qrCodeBase64: paymentResponse.point_of_interaction?.transaction_data?.qr_code_base64,
        qrCode: paymentResponse.point_of_interaction?.transaction_data?.qr_code,
        pixKey: paymentResponse.point_of_interaction?.transaction_data?.ticket_url,
        amount: selectedPackage.amount,
      });
    }

    return res.status(400).json({ error: 'Failed to create Pix payment', details: paymentResponse });

  } catch (error) {
    console.error('Mercado Pago Pix Error:', error);
    return res.status(500).json({ error: 'Failed to create Pix payment session' });
  }
}

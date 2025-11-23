import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Inicializa o Stripe com a chave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

// Dados de pacotes de ManusCoins (Mock Data)
const packages = [
  { id: 'package_1', name: '1.000 ManusCoins', price: 1000, amount: 1000 }, // Preço em centavos (R$ 10,00)
  { id: 'package_2', name: '5.500 ManusCoins', price: 4500, amount: 5500 }, // Preço em centavos (R$ 45,00)
  { id: 'package_3', name: '12.000 ManusCoins', price: 9000, amount: 12000 }, // Preço em centavos (R$ 90,00)
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { packageId, userId } = req.body;

  if (!packageId || !userId) {
    return res.status(400).json({ error: 'Missing packageId or userId' });
  }

  const selectedPackage = packages.find(p => p.id === packageId);

  if (!selectedPackage) {
    return res.status(404).json({ error: 'Package not found' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: selectedPackage.name,
              description: `Compra de ${selectedPackage.amount} ManusCoins`,
            },
            unit_amount: selectedPackage.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // URLs de redirecionamento (ajustar para o seu domínio real)
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/wallet?success=true&coins=${selectedPackage.amount}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/marketplace?canceled=true`,
      // Metadados para identificar o usuário e o pacote após o pagamento
      metadata: {
        userId: userId,
        packageId: selectedPackage.id,
      },
    });

    return res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    return res.status(500).json({ error: 'Failed to create Stripe checkout session' });
  }
}

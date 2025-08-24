export default async function handler(req: any, res: any) {
  return res.status(200).json({ ok: true, env: process.env.NODE_ENV });
} 
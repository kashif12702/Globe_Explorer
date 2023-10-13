import jwt from 'jsonwebtoken';

const users = [
    { id: 1, username: 'user', password: '123456' },
];

const jwtSecret = 'your-secret-key';

export default async (req, res) => {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        const user = users.find((u) => u.username === username && u.password === password);

        if (user) {
            const token = jwt.sign({ userId: user.id }, jwtSecret);

            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } else {
        res.status(405).end();
    }
};

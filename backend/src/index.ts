import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth';
import { productsRouter } from './routes/products';
import { customersRouter } from './routes/customers';
import { suppliersRouter } from './routes/suppliers';
import { invoicesRouter } from './routes/invoices';
import { purchasesRouter } from './routes/purchases';
import { inventoryRouter } from './routes/inventory';
import { returnsRouter } from './routes/returns';
import { paymentsRouter } from './routes/payments';
import { expensesRouter } from './routes/expenses';
import { cashBoxRouter } from './routes/cashBox';
import { reportsRouter } from './routes/reports';
import { usersRouter } from './routes/users';
import { branchesRouter } from './routes/branches';
import { categoriesRouter } from './routes/categories';
import { errorHandler } from './middleware/errorHandler';
import { authenticateToken } from './middleware/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (_, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// Public routes
app.use('/api/auth', authRouter);

// Protected routes
app.use('/api/products', authenticateToken, productsRouter);
app.use('/api/customers', authenticateToken, customersRouter);
app.use('/api/suppliers', authenticateToken, suppliersRouter);
app.use('/api/invoices', authenticateToken, invoicesRouter);
app.use('/api/purchases', authenticateToken, purchasesRouter);
app.use('/api/inventory', authenticateToken, inventoryRouter);
app.use('/api/returns', authenticateToken, returnsRouter);
app.use('/api/payments', authenticateToken, paymentsRouter);
app.use('/api/expenses', authenticateToken, expensesRouter);
app.use('/api/cash-box', authenticateToken, cashBoxRouter);
app.use('/api/reports', authenticateToken, reportsRouter);
app.use('/api/users', authenticateToken, usersRouter);
app.use('/api/branches', authenticateToken, branchesRouter);
app.use('/api/categories', authenticateToken, categoriesRouter);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

export default app;

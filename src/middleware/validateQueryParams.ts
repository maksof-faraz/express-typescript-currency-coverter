import { Request, Response, NextFunction } from 'express';

// Define the enum for 'type'
export enum TypeEnum {
    Latest = 'latest',
    Historical = 'historical'
  }
  
  // Define the interface for query parameters
  export interface QueryParams {
    amount? :number;
    base_currency: string;
    currencies: string;
    type: TypeEnum;
    date?: string; // Optional field
  }

  export  function validateQueryParams(req: Request <QueryParams>, res: Response, next: NextFunction) : any {
    const { base_currency, currencies, type, date } = req.query;

    if (!base_currency || typeof base_currency !== 'string') {
      return res.status(400).json({ error: 'base_currency is required and must be a string' });
    }
  
    if (!currencies || typeof currencies !== 'string') {
        return res.status(400).json({ error: 'currencies is required and must be a string' });
    }
  
    if (!type || !Object.values(TypeEnum).includes(type as TypeEnum)) {
        return res.status(400).json({
         error: `type is required and must be one of the following values: "${TypeEnum.Latest}" or "${TypeEnum.Historical}"`
      });
    }
  
    if (date && typeof date !== 'string') {
        return res.status(400).json({ error: 'date must be a string if provided' });
    }
    if (type == 'historical' && !date) return res.status(400).json({ error: 'date must be required for historial conversion' });

  next();
}

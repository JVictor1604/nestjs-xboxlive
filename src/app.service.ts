import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  GetAppStatus(): string {
    return 'Server is running! 🚀 Please check http://localhost:3000/api for Swagger docs...';
  }
}

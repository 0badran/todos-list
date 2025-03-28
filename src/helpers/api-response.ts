export default class ApiResponse {
   message: string = '';
   status: string = '';
   code: number = 500;
   errors: unknown = null;
   data: unknown = null;
   constructor() { }
   create(config: { message: string, code: number, status: string, errors?: unknown, data?: unknown }) {
      this.message = config.message;
      this.status = config.status;
      this.code = config.code;
      this.errors = config.errors;
      this.data = config.data;
      return new Response(JSON.stringify(this), { status: this.code });
   }
}
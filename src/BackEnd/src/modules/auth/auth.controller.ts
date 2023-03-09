import { Controller, Post, UseGuards, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
    @UseGuards(AuthGuard("local"))
    @Post("login")
    async login(@Body() email: string, @Body() password: string) {
        
    }
}
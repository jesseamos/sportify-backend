import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "../constant/constant";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)
        if (!token) {
            throw new UnauthorizedException()
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token
            )

            request['user'] = payload
        } catch (err) {
            console.log(err)
            throw new UnauthorizedException()
        }
        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        console.log("type: ", type)
        console.log("token: ", token)
        return type === 'Bearer' ? token : undefined;
    }
}


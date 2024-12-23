import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { map } from "rxjs";
import { plainToClass } from "class-transformer";

export function Serialize(dto: any) {
    return UseInterceptors(new CustomInterceptor(dto))
}

class CustomInterceptor implements NestInterceptor {
    constructor(private dto: any) { }
    intercept(context: ExecutionContext, next: CallHandler<any>) {
        return (
            next.handle().pipe(
                map((data: any) => {
                    return plainToClass(this.dto, data, {
                        excludeExtraneousValues: true
                    })
                })
            )
        )
    }
}
// use_this_value_222

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetStudentDecorator23 = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // console.log("req headers ==> ", request.headers);
    return request.headers?.student_decorator23;
},);
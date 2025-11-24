import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseInterceptors, } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from 'src/student23/create-student.dto';
import { UpdateStudentDto } from 'src/student23/update-student.dto';
import { GetStudentDecorator23 } from './student-custom-decorator';
import { Student23Interceptors } from './student-custom-interceptor';

// @UseInterceptors(Student23Interceptors)         // applies to all routes in this controller
@Controller('student')
export class StudentController {

    constructor(private readonly studentService: StudentService) { }

    @Post()
    async createStudent(
        @Res() response,
        @Body() createStudentDto: CreateStudentDto,
    ) {
        try {
            const newStudent = await this.studentService.createStudent(
                createStudentDto,
            );
            return response.status(HttpStatus.CREATED).json({
                message: 'Student has been created successfully',
                newStudent,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Student not created!',
                error: 'Bad Request',
            });
        }
    }
    @Put('/:id')
    async updateStudent(
        @Res() response,
        @Param('id') studentId: string,
        @Body() updateStudentDto: UpdateStudentDto,
    ) {
        try {
            const existingStudent = await this.studentService.updateStudent(
                studentId,
                updateStudentDto,
            );
            return response.status(HttpStatus.OK).json({
                message: 'Student has been successfully updated',
                existingStudent,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    @Get()
    @UseInterceptors(Student23Interceptors)
    async getStudents() {
        try {
            const studentData = await this.studentService.getAllStudents();

            // ======== this is with interceptor ==========
            return {
                studentData,
            };

            // ============== this is without interceptor ========================================
            // return response.status(HttpStatus.OK).json({
            //     studentData,
            // });
        } catch (err) {
            return {
                statusCode: err.status || HttpStatus.INTERNAL_SERVER_ERROR,
                error: err.response || err.message || 'Internal server error',
            };
        }
    }
    @Get('/:id')
    async getStudent(@GetStudentDecorator23() stuVal:string, @Res() response, @Param('id') studentId: string) {
        try {
            const existingStudent = await this.studentService.getStudent(studentId);
            return response.status(HttpStatus.OK).json({
                stuValInfo: `using_custom_decorator23___stuVal === ${stuVal}`,
                existingStudent,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    @Delete('/:id')
    async deleteStudent(@Res() response, @Param('id') studentId: string) {
        try {
            const deletedStudent = await this.studentService.deleteStudent(studentId);
            return response.status(HttpStatus.OK).json({
                message: 'Student deleted successfully',
                deletedStudent,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}

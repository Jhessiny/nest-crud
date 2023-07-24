import { WriteReviewDTO } from './dto/write-review';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  GetMovieService,
  WriteReviewService,
} from '~/catalog/application/use-cases/contracts';
import { DeleteMovieService } from '~/catalog/application/use-cases/contracts/delete-movie';
import { UpdateReviewService } from '~/catalog/application/use-cases/contracts/update-review';

@Controller()
export class CatalogController {
  constructor(
    @Inject('WriteReviewService')
    private readonly writeReviewService: WriteReviewService,
    @Inject('GetMovieService')
    private readonly getMovieService: GetMovieService,
    @Inject('UpdateReviewService')
    private readonly updateReviewService: UpdateReviewService,
    @Inject('DeleteMovieService')
    private readonly deleteMovieService: DeleteMovieService,
  ) {}

  @Post('/review')
  async writeReview(@Body() input: WriteReviewDTO) {
    const result = await this.writeReviewService.execute(input);
    return result;
  }

  @Get('/movie/:id')
  async getMovie(@Param() input: GetMovieService.InputDTO) {
    const result = await this.getMovieService.execute(input);
    return result;
  }

  @Put('/review')
  async updateReview(@Body() input: UpdateReviewService.InputDTO) {
    const result = await this.updateReviewService.execute(input);
    return result;
  }

  @Delete('/movie/:id')
  async deleteMovie(@Param() input: DeleteMovieService.InputDTO) {
    const result = await this.deleteMovieService.execute(input);
    return result;
  }
}

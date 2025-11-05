import { Controller, Get, Param } from '@nestjs/common';
import { GridService } from './grid.service';
import { TitlesResponse, Title } from '../common/interfaces/grid';

@Controller('grid')
export class GridController {
  constructor(private readonly gridService: GridService) {}

  @Get('titles')
  async getTitles(): Promise<TitlesResponse> {
    return this.gridService.getTitles();
  }

  @Get('titles/:id')
  async getTitleById(@Param('id') id: string): Promise<{ title: Title }> {
    return this.gridService.getTitleById(id);
  }

  // @Get('tournaments')
  // async getTournaments(
  //   @Query('titleId') titleId?: string,
  //   @Query('limit') limit?: string,
  // ): Promise<any> {
  //   const limitNumber = limit ? parseInt(limit, 10) : 10;
  //   return this.gridService.getTournaments(titleId, limitNumber);
  // }
}

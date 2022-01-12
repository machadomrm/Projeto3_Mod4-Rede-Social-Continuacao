/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiBody, ApiCreatedResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@ApiTags('categoria')
@ApiBearerAuth('JWT-auth')
@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'CRIAÇÃO DE CATEGORIAS' })
  @ApiBody({
    description: 'EXECUTADO COM SUCESSO',
    schema: {
      properties: {
        nome: { example: "COMEDIA" }
      }
    },
  })
  @ApiCreatedResponse({description: 'EXECUTADO COM SUCESSO'})
  @ApiBadRequestResponse({ description: 'NÃO ADICIONADO' })
  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaService.create(createCategoriaDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: 'LISTA TODOS AS CATEGORIAS' })
  @ApiOkResponse({
    description: 'EXECUTADO COM SUCESSO',
    schema: {
      properties: {
        id: { example: 2 },
        nome: { example:"DRAMA" },
        criado_em: { example:"2022-01-11T18:11:16.607Z" }
      }
    }
  })
  @ApiNotFoundResponse({ description: 'NÃO EXECUTADO' })
  findAll() {
    return this.categoriaService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOperation({ summary: 'EXIBE UMA ÚNICA CATEGORIA' })
  @ApiParam({ name: "id", required: true, description: 'ID DA CATEGORIA' })
  @ApiOkResponse({
    description: 'EXECUTADO COM SUCESSO',
    schema:{
      properties: {
        id: { example: 2 },
        nome: { example:"ANIMACAO" },
        criado_em: { example:"2022-01-11T18:11:18.607Z" }
      }
    }
  })
  @ApiNotFoundResponse({ description:'ID NÃO ENCONTRADO' })
  findOne(@Param('id') id: string) {
    return this.categoriaService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @ApiOperation({ summary: 'ALTERA A PROPRIEDADE DA CATEGORIA' })
  @ApiParam({ name: "id", required: true, description: 'ID DA CATEGORIA' })
  @ApiBody(
    {
      schema:{
        properties: {
          nome: { example:"FICCAO" }
        }
      }
    }
  )
  @ApiOkResponse({
    description: 'EXECUTADO COM SUCESSO',
    schema:{
      properties: {
        id: { example: 1 },
        nome: { example:"EROTICO" },
        criado_em: { example:"2022-01-11T18:11:19.607Z" }
      }
    }
  })
  @ApiNotFoundResponse({ description:'ID NÃO ENCONTRADO' })
  update(
    @Param('id') id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.categoriaService.update(+id, updateCategoriaDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'DELETA CATEGORIA' })
  @ApiParam({ name: "id", required: true, description: 'ID DA CATEGORIA' })
  @ApiOkResponse({ description: 'EXECUTADO COM SUCESSO'})
  @ApiNotFoundResponse({ description:'ID NÃO ENCONTRADO' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriaService.remove(+id);
  }
}

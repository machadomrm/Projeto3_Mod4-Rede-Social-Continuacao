/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete,  } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('usuario')
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @ApiOperation({ summary: 'CRIAÇÃO DO USUÁRIO' })
  @ApiBody({
    description: 'EXECUTADO COM SUCESSO',
    schema: {
      properties: {
        nome: { example: "machado" },
        senha: { example: "123Mudar" },
        imagem: { example: "machadomrm.jpeg" },
        bio: { example: "estudante de backend" },
        nascimento: { example: "1977-06-06" }
      }
    },
  })
  @ApiCreatedResponse({description: 'EXECUTADO COM SUCESSO'})
  @ApiBadRequestResponse({ description: 'NÃO ADICIONADO' })
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @ApiBearerAuth('JWT-auth')
  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'LISTA TODOS OS USUÁRIO' })
  @ApiOkResponse({
    description: 'EXECUTADO COM SUCESSO',
    schema: {
      properties: {
        id: { example: 2 },
        nome: { example:"rita" },
        senha: { example: "$5b$21$c.H37Hj9pCJScpgi8ddvMOqo5ANRHh0ukrETlSwWimLU3a7Mflwpo" },
        imagem: { example: "rita.jpeg" },
        bio: { example: "designer" },
        nascimento: { example: "1989-03-17T03:00:00.000Y" },
        criado_em: { example: "2021-12-20T04:10:37.241Z" },
        modificado_em: { example: "2021-12-20T04:10:37.241Z" },
        seguidores: { example:[] },
        seguindo: { example:[] },
        tweet: { example:[] },
      }
    }
  })
  @ApiNotFoundResponse({ description: 'NÃO EXECUTADO' })
  findAll() {
    return this.usuarioService.findAll();
  }

  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'EXIBE UM USUÁRIO ESPECÍFICO' })
  @ApiParam({ name: "id", required: true, description: 'ID DO PARTICIPANTE' })
  @ApiOkResponse({
    description: 'EXECUTADO COM SUCESSO',
    schema: {
      properties: {
        id: { example: 2 },
        nome: { example:"rita" },
        senha: { example: "$5b$21$c.H37Hj9pCJScpgi8ddvMOqo5ANRHh0ukrETlSwWimLU3a7Mflwpo" },
        imagem: { example: "rita.jpeg" },
        bio: { example: "designer" },
        nascimento: { example: "1989-03-17T03:00:00.000Y" },
        criado_em: { example: "2021-12-20T04:10:37.241Z" },
        modificado_em: { example: "2021-12-20T04:10:37.241Z" },
        seguidores: { example:[] },
        seguindo: { example:[] },
        tweet: { example:[] },
      }
    }
  })
  @ApiNotFoundResponse({ description:'ID NÃO ENCONTRADO' })
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @ApiOperation({ summary: 'ALTERA A PROPRIEDADE DO USUÁRIO' })
  @ApiParam({ name: "id", required: true, description: 'ID DO PARTICIPANTE' })
  @ApiBody({
    description: 'EXECUTADO COM SUCESSO',
    schema: {
      properties: {
        nome: {example: "alexandre"}
      }
    }
  })
  @ApiOkResponse({
    description: 'EXECUTADO COM SUCESSO',
    schema: {
      properties: {
        id: { example: 2 },
        nome: { example:"rute" },
        senha: { example: "$5b$21$c.H37Hj9pCJScpgi8ddvMOqo5ANRHh0ukrETlSwWimLU3a7Mflwpo" },
        imagem: { example: "rute.jpeg" },
        bio: { example: "designer" },
        nascimento: { example: "1992-07-17T03:00:00.000" },
        criado_em: { example: "2021-12-20T04:10:37.241Z" },
        modificado_em: { example: "2021-12-20T04:10:37.241Z" },
        seguidores: { example:[] },
        seguindo: { example:[] },
        tweet: { example:[] },
      }
    }
  })
  @ApiNotFoundResponse({ description: 'ID NÃO ENCONTRADO' })
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOperation({ summary: 'DELETA UM USUÁRIO' })
  @ApiParam({ name: 'id', required: true, description: 'ID do participante' })
  @ApiOkResponse({ description: 'EXECUTADO COM SUCESSO'})
  @ApiNotFoundResponse({ description:'ID NÃO ENCONTRADO' })
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}

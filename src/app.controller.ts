import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { log } from 'console';
import { Sutemeny } from './sutemeny';
import { CreateSutemenyDto } from './create-sutemeny.dto';
import { UpdateSutiAdatok } from './updateSutemeny.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  sutik: Sutemeny[] = [
    {
      id: 1,
      nev: 'Palacsinta',
      laktozMentes: true,
      db: 5,
    },
    {
      id: 2,
      nev: 'Tiramisu',
      laktozMentes: false,
      db: 10,
    },
    {
      id: 4,
      nev: 'Krémes',
      laktozMentes: true,
      db: 0,
    }
  ]
  nextId = 5;

  @Get('sutik')
  sutemenyekListazas() {
    return this.sutik
      //.map((suti, idx) => { return { id: idx, name: suti } })
      //.filter(suti => suti.name != null);
  }

  @Get('sutik/:sutiid')
  sutemenyIdAlapjan(@Param('sutiid') id: string) {
    const idSzam = parseInt(id);

    return this.sutik.find(suti =>suti.id == idSzam);
  }

  @Get('sutiKereses')
  sutemenyKereses(@Query('kereses') kereses?: string) {
    if (!kereses) {
      return this.sutik
    }
    return this.sutik.filter(suti => suti.nev.toLocaleLowerCase().includes(kereses.toLocaleLowerCase()))
  }

  @Delete('sutik/:sutiid')
  sutiTorles(@Param('sutiid') id: string) {
    const idSzam = parseInt(id);
    const idx = this.sutik.findIndex(suti =>suti.id == idSzam)
    this.sutik.splice(idx);

    //this.sutik[idSzam] = null;
  }

  @Post('ujSuti')
  ujSuti(@Body() ujSutiAdatok: CreateSutemenyDto){
    const ujSutemeny: Sutemeny = {
      id: this.nextId,
      nev: ujSutiAdatok.nev,
      laktozMentes: ujSutiAdatok.laktozMentes,
      db: ujSutiAdatok.db
    }
    this.nextId++;
    this.sutik.push(ujSutemeny);
    return ujSutemeny;
  }

  @Patch('sutiModositas/:sutiid')
  sutiModositas(@Param('sutiid') id: string, @Body() sutiAdatok: UpdateSutiAdatok){
    const idSzam = parseInt(id);
    const eredetiSutiid = this.sutik.findIndex(suti => suti.id == idSzam);
    const eredetiSuti = this.sutik[eredetiSutiid];

    const ujSuti: Sutemeny = {
      ...eredetiSuti,
      ...sutiAdatok,
    };
    this.sutik[eredetiSutiid] = ujSuti;
    return ujSuti;
  }
}
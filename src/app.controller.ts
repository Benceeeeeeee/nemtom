import { Controller, Delete, Get, Param, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { log } from 'console';

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

  sutik = [
    'Palacsinta',
    'Tiramisu',
    'Krémes',
  ]
  @Get('sutik')
  sutemenyekListazas() {
    return this.sutik
    .map((suti, idx) => {return {id: idx, name: suti}})
    .filter(suti => suti.name != null);
  }

  @Get('sutik/:sutiid')
  sutemenyIdAlapjan(@Param('sutiid') id: string) {
    const idSzam = parseInt(id);

    return this.sutik[idSzam];
  }

  @Get('sutiKereses')
  sutemenyKereses(@Query('kereses') kereses?: string){
    if(!kereses){
      return this.sutik
    }
    return this.sutik.filter(suti => suti.toLocaleLowerCase().includes(kereses.toLocaleLowerCase()))
  }

  @Delete('sutik/:sutiid')
  sutiTorles(@Param('sutiid') id: string){
    const idSzam = parseInt(id);
    this.sutik[idSzam] = null;


  }

}
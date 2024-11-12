import { Controller, Get, Param, Query, Render } from '@nestjs/common';
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
    return this.sutik;
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
}
import { Controller, Get } from '@nestjs/common';
import { ApiProperty, ApiExtraModels, getSchemaPath, ApiResponse } from '@nestjs/swagger';

class Cat {
  @ApiProperty()
  id: string;
}

class Dog {
  @ApiProperty()
  id: string;
}

@ApiExtraModels(Cat, Dog)
class Zoo {
  @ApiProperty({
    oneOf: [
      {
        type: 'array',
        items: {
          $ref: getSchemaPath(Cat),
        },
      },
      {
        type: 'array',
        items: {
          $ref: getSchemaPath(Dog),
        },
      },
    ],
  })
  animals: Cat[] | Dog[];
}

@Controller()
export class AppController {
  @Get('zoo')
  @ApiResponse({ type: Zoo })
  getAnimals(): Zoo {
    return {
      animals: [],
    };
  }
}

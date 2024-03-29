import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Producto} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository: ProductoRepository,
  ) {}

  @post('/productos', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProducto',
            exclude: ['id'],
          }),
        },
      },
    })
    producto: Omit<Producto, 'id'>,
  ): Promise<Producto> {
    return this.productoRepository.create(producto);
  }

  @get('/productos/count', {
    responses: {
      '200': {
        description: 'Producto model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Producto) where?: Where<Producto>): Promise<Count> {
    return this.productoRepository.count(where);
  }

  @get('/productos', {
    responses: {
      '200': {
        description: 'Array of Producto model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Producto, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Producto) filter?: Filter<Producto>,
  ): Promise<Producto[]> {
    return this.productoRepository.find(filter);
  }

  @patch('/productos', {
    responses: {
      '200': {
        description: 'Producto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Producto,
    @param.where(Producto) where?: Where<Producto>,
  ): Promise<Count> {
    return this.productoRepository.updateAll(producto, where);
  }

  @get('/productos/{id}', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Producto, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Producto, {exclude: 'where'})
    filter?: FilterExcludingWhere<Producto>,
  ): Promise<Producto> {
    return this.productoRepository.findById(id, filter);
  }

  @patch('/productos/{id}', {
    responses: {
      '204': {
        description: 'Producto PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Producto,
  ): Promise<void> {
    await this.productoRepository.updateById(id, producto);
  }

  @put('/productos/{id}', {
    responses: {
      '204': {
        description: 'Producto PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() producto: Producto,
  ): Promise<void> {
    await this.productoRepository.replaceById(id, producto);
  }

  @del('/productos/{id}', {
    responses: {
      '204': {
        description: 'Producto DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.productoRepository.deleteById(id);
  }

  @get('/productos/vPrecio30')
  async vista1(): Promise<any> {
    let datos: any[] = await this.getView1();
    return datos;
  }
  async getView1() {
    return await this.productoRepository.dataSource.execute(
      `SELECT * FROM dbo.vPrecio30`,
    );
  }

  @get('/productos/vPrecioDefinido')
  async vista2(): Promise<any> {
    let datos: any[] = await this.getView2();
    return datos;
  }
  async getView2() {
    return await this.productoRepository.dataSource.execute(
      `SELECT * FROM dbo.vPrecioDefinido`,
    );
  }
}

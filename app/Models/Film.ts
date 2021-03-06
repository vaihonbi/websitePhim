import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, belongsTo, BelongsTo, hasOne, HasOne  } from '@ioc:Adonis/Lucid/Orm'
import Information from 'App/Models/Information'
import Category from 'App/Models/Category'
import Classify from 'App/Models/Classify'
import ServerStorage from 'App/Models/ServerStorage'

export default class Film extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public thumb: string

  @hasOne(() => Information)
  public information: HasOne<typeof Information>

  @column()
  public categoryId: number

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>

  @column()
  public classifyId: number

  @belongsTo(() => Classify)
  public classify: BelongsTo<typeof Classify>

  @hasMany(() => ServerStorage)
  public serverStorage: HasMany<typeof ServerStorage>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Information extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public releaseDate: DateTime

  @column()
  public directors: string

  @column()
  public nation: string

  @column()
  public long: number

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

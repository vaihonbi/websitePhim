import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ServerStorage extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public filmId: number

  @column()
  public typeVideo: string

  @column()
  public episode: number

  @column()
  public link: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

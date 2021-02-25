import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ServerStorages extends BaseSchema {
  protected tableName = 'server_storages'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('film_id').unsigned().references('id').inTable('films').onDelete('CASCADE')
      table.enum('type_video', ['link', 'youtube', 'm3u8'])
      table.integer('episode').defaultTo(1)
      table.string('link').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

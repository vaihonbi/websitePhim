import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ServerStorages extends BaseSchema {
  protected tableName = 'server_storages'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('film_id').unsigned().references('id').inTable('films').onDelete('CASCADE')
      table.integer('episode').defaultTo(0)
      table.string('link').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

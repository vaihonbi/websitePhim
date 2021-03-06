import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Information extends BaseSchema {
  protected tableName = 'information'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('film_id')
      table.date('release_date')
      table.string('directors')
      table.string('nation')
      table.integer('long')
      table.text('description')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

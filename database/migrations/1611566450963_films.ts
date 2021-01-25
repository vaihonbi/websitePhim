import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Films extends BaseSchema {
  protected tableName = 'films'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('thumb')
      table.integer('information_id').unsigned().references('id').inTable('information').onDelete('CASCADE')
      table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('CASCADE')
      table.integer('classify_id').unsigned().references('id').inTable('classifies').onDelete('CASCADE')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

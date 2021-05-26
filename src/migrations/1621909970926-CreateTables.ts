import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateTables1621909970926 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    // user
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        { name: 'id', type: 'int', isPrimary: true },
        { name: 'name', type: 'varchar' },
        { name: 'email', type: 'varchar' },
        { name: 'password', type: 'varchar' },
      ],
    }), true);

    // companies
    await queryRunner.createTable(new Table({
      name: 'companies',
      columns: [
        { name: 'id', type: 'int', isPrimary: true },
        { name: 'name', type: 'varchar' },
      ],
    }), true);

    // user_company
    await queryRunner.createTable(new Table({
      name: 'user_company',
      columns: [
        { name: 'user_id', type: 'int', isPrimary: true },
        { name: 'company_id', type: 'int', isPrimary: true },
      ],
    }), true);
    await queryRunner.createForeignKey('user_company', new TableForeignKey({
      name: 'fk_user_company_user_id',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
    }));
    await queryRunner.createIndex('user_company', new TableIndex({
      name: 'ix_user_company_user_id',
      columnNames: ['user_id']
    }));
    await queryRunner.createForeignKey('user_company', new TableForeignKey({
      name: 'fk_user_company_company_id',
      columnNames: ['company_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'companies',
    }));
    await queryRunner.createIndex('user_company', new TableIndex({
      name: 'ix_user_company_company_id',
      columnNames: ['company_id']
    }));

    // products
    await queryRunner.createTable(new Table({
      name: 'products',
      columns: [
        { name: 'id', type: 'int', isPrimary: true },
        { name: 'company_id', type: 'int' },
        { name: 'name', type: 'varchar' },
        { name: 'description', type: 'varchar' },
      ],
    }), true);
    await queryRunner.createForeignKey('products', new TableForeignKey({
      name: 'fk_products_company_id',
      columnNames: ['company_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'companies',
    }));
    await queryRunner.createIndex('products', new TableIndex({
      name: 'ix_products_company_id',
      columnNames: ['company_id']
    }));

    // inventories
    await queryRunner.createTable(new Table({
      name: 'inventories',
      columns: [
        { name: 'id', type: 'int', isPrimary: true },
        { name: 'product_id', type: 'int' },
        { name: 'color', type: 'varchar' },
        { name: 'size', type: 'varchar' },
      ],
    }), true);
    await queryRunner.createForeignKey('inventories', new TableForeignKey({
      name: 'fk_inventories_product_id',
      columnNames: ['product_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'products',
    }));
    await queryRunner.createIndex('inventories', new TableIndex({
      name: 'ix_inventories_product_id',
      columnNames: ['product_id']
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('inventories', 'fk_inventories_product_id');
    await queryRunner.dropTable('inventories');
    await queryRunner.dropForeignKey('products', 'fk_products_company_id');
    await queryRunner.dropTable("products");
    await queryRunner.dropForeignKey('user_company', 'fk_user_company_user_id');
    await queryRunner.dropForeignKey('user_company', 'fk_user_company_company_id');
    await queryRunner.dropTable("user_company");
    await queryRunner.dropTable("users");
    await queryRunner.dropTable("companies");
  }
}

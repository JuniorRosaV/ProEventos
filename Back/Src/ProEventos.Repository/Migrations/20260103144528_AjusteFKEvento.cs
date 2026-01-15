using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace proeventos.Repository.Migrations
{
    /// <inheritdoc />
    public partial class AjusteFKEvento : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lotes_Eventos_IdEvento",
                table: "Lotes");

            migrationBuilder.RenameColumn(
                name: "IdEvento",
                table: "Lotes",
                newName: "EventoId");

            migrationBuilder.RenameIndex(
                name: "IX_Lotes_IdEvento",
                table: "Lotes",
                newName: "IX_Lotes_EventoId");

            migrationBuilder.AlterColumn<int>(
                name: "EventoId",
                table: "RedesSociais",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DataEvento",
                table: "Eventos",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Eventos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Telefone",
                table: "Eventos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Lotes_Eventos_EventoId",
                table: "Lotes",
                column: "EventoId",
                principalTable: "Eventos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lotes_Eventos_EventoId",
                table: "Lotes");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Eventos");

            migrationBuilder.DropColumn(
                name: "Telefone",
                table: "Eventos");

            migrationBuilder.RenameColumn(
                name: "EventoId",
                table: "Lotes",
                newName: "IdEvento");

            migrationBuilder.RenameIndex(
                name: "IX_Lotes_EventoId",
                table: "Lotes",
                newName: "IX_Lotes_IdEvento");

            migrationBuilder.AlterColumn<int>(
                name: "EventoId",
                table: "RedesSociais",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DataEvento",
                table: "Eventos",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Lotes_Eventos_IdEvento",
                table: "Lotes",
                column: "IdEvento",
                principalTable: "Eventos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

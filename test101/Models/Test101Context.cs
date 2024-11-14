using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace test101.Models;

public partial class Test101Context : DbContext
{
    public Test101Context()
    {
    }

    public Test101Context(DbContextOptions<Test101Context> options)
        : base(options)
    {
    }

    public virtual DbSet<Cliente> Clientes { get; set; }

// #warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
//         => optionsBuilder.UseSqlServer("Server=TEMPTECH;Database=test101;Integrated Security=True;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.IdCliente).HasName("PK__CLIENTE__677F38F59D19C731");

            entity.ToTable("CLIENTE");

            entity.Property(e => e.IdCliente)
                .ValueGeneratedOnAdd()
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("id_cliente");
            entity.Property(e => e.DireccionCliente)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("direccion_cliente");
            entity.Property(e => e.FechaRegistro)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("fecha_registro");
            entity.Property(e => e.NombreCliente)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("nombre_cliente");
            entity.Property(e => e.NroDocumento)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("nro_documento");
            entity.Property(e => e.Pdf).HasColumnName("pdf");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

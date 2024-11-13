using System;
using System.Collections.Generic;

namespace test101.Models;

public partial class Cliente
{
    public decimal IdCliente { get; set; }

    public string? NombreCliente { get; set; }

    public string? DireccionCliente { get; set; }

    public DateOnly? FechaRegistro { get; set; }

    public byte[]? Pdf { get; set; }
}

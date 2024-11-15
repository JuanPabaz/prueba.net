USE [test101]
GO
/****** Object:  StoredProcedure [dbo].[InsertarCliente]    Script Date: 14/11/2024 6:57:44 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[InsertarCliente]
    @nombre_cliente VARCHAR(50),
    @direccion_cliente VARCHAR(100),
    @pdf VARBINARY(MAX),
    @nro_documento VARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO CLIENTE (
        nombre_cliente,
        direccion_cliente,
        pdf,
        nro_documento
    )
    VALUES (
        @nombre_cliente,
        @direccion_cliente,
        @pdf,
        @nro_documento
    );

    PRINT 'Cliente insertado exitosamente';
END;

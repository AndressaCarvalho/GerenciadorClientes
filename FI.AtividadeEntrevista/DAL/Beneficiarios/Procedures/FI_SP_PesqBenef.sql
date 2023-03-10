CREATE PROC FI_SP_PesqBenef
	@INICIAREM       INT,
	@QUANTIDADE      INT,
	@CAMPOORDENACAO  VARCHAR(200),
	@CRESCENTE       BIT 
AS
BEGIN
	DECLARE @SCRIPT NVARCHAR(MAX)
	DECLARE @CAMPOS NVARCHAR(MAX)
	DECLARE @ORDER VARCHAR(50)
	
	SET @ORDER = ' NOME '

	IF(@CRESCENTE = 0)
		SET @ORDER = @ORDER + ' DESC'
	ELSE
		SET @ORDER = @ORDER + ' ASC'

	SET @CAMPOS = '@INICIAREM INT, @QUANTIDADE INT'
	SET @SCRIPT = 
	'SELECT ID, NOME, CPF, IDCLIENTE FROM
		(SELECT ROW_NUMBER() OVER (ORDER BY ' + @ORDER + ') AS Row, ID, NOME, CPF, IDCLIENTE FROM BENEFICIARIOS WITH(NOLOCK))
		AS BeneficiariosWithRowNumbers
	WHERE Row > @INICIAREM AND Row <= (@INICIAREM+@QUANTIDADE) ORDER BY'
	
	SET @SCRIPT = @SCRIPT + @ORDER
			
	EXECUTE SP_EXECUTESQL @SCRIPT, @CAMPOS, @INICIAREM, @QUANTIDADE

	SELECT COUNT(1) FROM BENEFICIARIOS WITH(NOLOCK)
END
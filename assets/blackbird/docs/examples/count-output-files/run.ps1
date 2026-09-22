Import-Module (Join-Path $env:BLACKBIRD_RUNTIME_ROOT 'Blackbird.Runtime.psm1') -Force
trap { Set-BlackbirdUnhandledFailureResult -ErrorRecord $_; break }

$OutputDirectory = Get-BlackbirdParameter -Name 'example.outputDirectory' -Required
$Files = @(Get-ChildItem -LiteralPath $OutputDirectory -File -ErrorAction Stop)
Set-BlackbirdSuccessResult -Title 'Output files' -Message ('Found {0} top-level files.' -f $Files.Count) -Items @($OutputDirectory)

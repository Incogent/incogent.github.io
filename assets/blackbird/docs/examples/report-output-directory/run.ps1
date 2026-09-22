Import-Module (Join-Path $env:BLACKBIRD_RUNTIME_ROOT 'Blackbird.Runtime.psm1') -Force
trap { Set-BlackbirdUnhandledFailureResult -ErrorRecord $_; break }

$OutputDirectory = Get-BlackbirdParameter -Name 'example.outputDirectory' -Required
if (-not (Test-Path -LiteralPath $OutputDirectory -PathType Container)) {
    Set-BlackbirdFailureResult -Title 'Folder unavailable' -Message 'The configured output directory is unavailable.' -Guidance 'Choose an existing Output directory for this project and run again.'
    throw 'Output directory is unavailable.'
}
Write-Output 'Read the configured output directory.'
Set-BlackbirdSuccessResult -Title 'Output directory' -Message 'The project setting was read successfully.' -Items @($OutputDirectory)

param(
  [int]$BudgetKB = 12,
  [string[]]$CriticalFiles = @('index.html', 'styles.css')
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Get-GzipLength {
  param([Parameter(Mandatory = $true)][string]$Path)

  if (-not (Test-Path -LiteralPath $Path)) {
    throw "Missing file: $Path"
  }

  $bytes = [System.IO.File]::ReadAllBytes($Path)
  $memory = New-Object System.IO.MemoryStream
  $gzip = New-Object System.IO.Compression.GZipStream($memory, [System.IO.Compression.CompressionLevel]::Optimal)
  $gzip.Write($bytes, 0, $bytes.Length)
  $gzip.Dispose()
  $gzipBytes = $memory.ToArray()
  $memory.Dispose()
  return $gzipBytes.Length
}

$rows = @()
$combined = 0

foreach ($file in $CriticalFiles) {
  $raw = (Get-Item -LiteralPath $file).Length
  $gzip = Get-GzipLength -Path $file
  $combined += $gzip
  $rows += [PSCustomObject]@{
    File = $file
    RawBytes = $raw
    GzipBytes = $gzip
  }
}

$budgetBytes = $BudgetKB * 1024
$remaining = $budgetBytes - $combined

$rows | Format-Table -AutoSize
Write-Output ""
Write-Output ("Combined gzip bytes: {0}" -f $combined)
Write-Output ("Budget bytes ({0}KB): {1}" -f $BudgetKB, $budgetBytes)

if ($combined -le $budgetBytes) {
  Write-Output ("PASS: {0} bytes remaining under budget." -f $remaining)
  exit 0
}

Write-Output ("FAIL: exceeded budget by {0} bytes." -f ($combined - $budgetBytes))
exit 1

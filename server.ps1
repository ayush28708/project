param(
    [int]$Port = 8080
)

$basePath = (Get-Location).Path

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
    Write-Host "SPORETS LIVE Server running at: $prefix"
} catch {
    Write-Warning "Port $Port busy, trying 8081..."
    $Port = 8081
    $listener = New-Object System.Net.HttpListener
    $prefix = "http://localhost:$Port/"
    $listener.Prefixes.Add($prefix)
    $listener.Start()
    Write-Host "SPORETS LIVE Server running at: $prefix"
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        try {
            $req = $context.Request
            $resp = $context.Response

            $urlPath = $req.Url.LocalPath
            if ($urlPath -eq "/" -or $urlPath -eq "") {
                $urlPath = "/index.html"
            }

            $relPath = $urlPath.TrimStart('/').Replace('/', [System.IO.Path]::DirectorySeparatorChar)
            $fullPath = [System.IO.Path]::Combine($basePath, $relPath)
            $resolvedBase = [System.IO.Path]::GetFullPath($basePath)
            $resolvedFull = [System.IO.Path]::GetFullPath($fullPath)

            if ($resolvedFull.StartsWith($resolvedBase) -and (Test-Path $resolvedFull -PathType Leaf)) {
                $ext = [System.IO.Path]::GetExtension($resolvedFull).ToLower()
                $contentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
                $bytes = [System.IO.File]::ReadAllBytes($resolvedFull)

                $resp.ContentType = $contentType
                $resp.ContentLength64 = $bytes.Length
                $resp.StatusCode = 200
                $resp.AddHeader("Access-Control-Allow-Origin", "*")

                if ($req.HttpMethod -ne "HEAD") {
                    $resp.OutputStream.Write($bytes, 0, $bytes.Length)
                }
            } else {
                $resp.StatusCode = 404
                $err = [System.Text.Encoding]::UTF8.GetBytes("Not Found")
                $resp.ContentType = "text/plain"
                $resp.ContentLength64 = $err.Length
                if ($req.HttpMethod -ne "HEAD") {
                    $resp.OutputStream.Write($err, 0, $err.Length)
                }
            }
        } catch {
            # Catch per-request errors without crashing loop
        } finally {
            try { $resp.OutputStream.Close() } catch {}
        }
    }
} finally {
    try { $listener.Stop(); $listener.Close() } catch {}
}

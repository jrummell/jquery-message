Set-StrictMode -Version 2.0

$version = $args[0]
$push = $args[1]
$apikey = $args[2]

# replace the version place holder with the version argument and copy to content\scripts
(Get-Content ..\src\jquery.message.js) | 
ForEach-Object { $_ -Replace "_VERSION_", $version } | 
Set-Content Package\Content\Scripts\jquery.message.js

cd Package
..\NuGet.exe Pack jQueryUI-Message.nuspec -Version $version

if ($push -eq "-Push")
{
    ..\NuGet.exe Push ("jQueryUI-Message." + $version + ".nupkg") $apikey
}

cd ..
node 'uac.vm.mandiant.com' {
  class { 'uac':
    installProxy         => true,
    installKeystore      => true,
    installDatabase      => true,
    useDevSshConfig      => true,
    targetEnvironment    => "development",
    proxyStaticFolder    => "/opt/web/apps/uac/dist/client",
  }
}
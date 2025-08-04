Vagrant.configure("2") do |config|

  config.vm.box = "ubuntu/focal64" 

  config.vm.network "forwarded_port", guest: 80, host: 8080  
  config.vm.network "forwarded_port", guest: 1337, host: 1337  
  config.vm.network "private_network", type: "dhcp"  

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "2048"  
    vb.cpus = 4        
  end

  config.vm.provision "shell", inline: <<-SHELL
    sudo apt-get update && sudo apt-get upgrade -y
  SHELL

end


### Work-Out-App
To log in to the Azure CLI (az command) from your Mac, follow these steps:

#### Installation:
If you haven't installed the Azure CLI yet, you can do so with Homebrew:

```bash
brew update && brew install azure-cli
```
#### Logging in:
Once you have the Azure CLI installed, you can log in to your Azure account using:

```bash
az login
```
This command will open a web page where you will be asked to enter a code and then log in using your Azure credentials. If your browser doesn't open, you can manually navigate to https://microsoft.com/devicelogin and enter the provided code.

#### List Subscriptions:
After logging in, you might want to see the Azure subscriptions associated with your account:

```bash
az account list --output table
```

This command will list your Azure subscriptions in a table format.

#### Set Default Subscription:
If you have multiple subscriptions and want to set a specific one as the default for your CLI session:

```bash
az account set --subscription "Your Subscription Name or ID"
```

Now you're logged into the Azure CLI on your Mac and can manage and administer your Azure resources directly from the terminal.

1. Create Windows Platform
 1a. Create azure VM using terraform
 1b.


az keyvault create --resource-group devops-resources --location westeurope --name haykay-key-vault

az keyvault secret set --name SecretPassword --value Onyema_0903 --vault-name haykay-key-vault




az group create --name devops-jenkins --location centralus

az sshkey create --name MySSHKey --public-key @~/.ssh/id_rsa.pub --resource-group devops-jenkins

az vm create \
    --resource-group devops-jenkins \
    --name linux-jenkins \
    --image Canonical:0001-com-ubuntu-server-focal:20_04-lts:latest \
    --admin-username admin_devops \
    --ssh-key-value ~/.ssh/id_rsa.pub

az vm open-port --port 80 --resource-group devops-jenkins --name linux-jenkins --priority 1010

ipaddress=$(az vm show --name linux-jenkins --resource-group devops-jenkins --show-details --query "publicIps" --output tsv)

ssh admin_devops@$ipaddress

### Installed PPA(package manager) for Ubuntu(needed to install jenkins)
sudo add-apt-repository ppa:openjdk-r/ppa
sudo apt-get update


### Installed JAVA-11
sudo apt-get install openjdk-11-jdk

### Installed chrony
sudo apt install chrony

### Installed ntpdate
The ntpdate command is used to manually synchronize the system clock with an NTP server1234. Here’s how you can use it to sync your system clock with the pool.ntp.org NTP server:
sudo apt install ntpdate
sudo ntpdate pool.ntp.org

### Install Apache Maven on Ubuntu => check online

### Install node js on Ubuntu => (React app)

### Install Jenkins on Ubuntu version  => Check online for your ubuntu version download instruction
Note: If Jenkins fail to start: change the port in the 
sudo vi /etc/systemd/system/jenkins.service.d/override.conf

Add this to the file:
[Service]
Environment="JENKINS_PORT=8081"


sudo systemctl daemon-reload
sudo systemctl restart jenkins
sudo systemctl status jenkins

here we find the password for jenkins for the first time if it runs successfully: /var/lib/jenkins/secrets/initialAdminPassword

After following the installation instruction such as digitalOcean(lets install the necessary plugins for the applications building on git)

First select the install default plugins after login and then follow the prompt


When logged into jenkins
1. first we configure global variable by going to manage jenkins and click tools
2. Then after go to plugins and click available plugins
I dashboard view
II Plugin for the package manager we are using(node js for javascript) or jdk for java
III Deploy to container
IV Email extension template


NB: very very important to always check the deployment, Monitoring tools compliance with whatever chosen CI Tool before going to deep 


Next we want to connect our git with jenkins(this step will enable manual build)

1.create git repo and push your app files into it

Go back to jenkins .
1. click dashboard
2. add item
3. put a name and click freestyle project and click ok
4. next toggle on source code management, add git and provide git URL, Then manually build
Nb: here we selected the monitoring tool, deployment tool . commit tool etc

To auto build commit from git
we go to the jenkins job
1. and click configure and google on github project under general and add our repo URL 
in the configure settings under  build trigger we toggle on GitHub hook trigger for GITScm polling
Then go to the github repo settings toggle under webhook add webhook and copy the jenkins URL path and add/github-webhook e.g
http://172.202.0.44:8080/github-webhook/
application type : application/json and finally add webhook

To contanerize the application and use jenkins to push to docker hub
1. create the docker image file in frontend folder and backend folder 
2. Then create a jenkins pipeline file to build the backend, front end, docker images and push to the hub
3. create the docker hub credentials and MongoDB uri crednetials in jenkins
credentials id is then used in the jenkinsfile 
Also very important to install docker pipeline plugins on jenkins
and always add jenkins to the group on the machine running docker: sudo usermod -aG docker jenkins
NB: for this to successfully run we need to run docker engine on the local server where jenkins is located in our caseazure ubuntu server

#### Create Mongo
docker run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=secret -e MONGO+INITDB_DATABASE=my_db mongo
export MONGODB_URI="MONGO_URI"
#### Build backend manually
docker build -t backend .
docker run -d -p 8008:4000 -e MONGO_URI="mongodb://mongoadmin:secret@20.29.119.159:27017/?retryWrites=true&w=majority" backend

#### Build frontend manually
docker build -t frontend .
docker run -d -p 3005:80 frontend

docker pull chukwuka1488/react-app:latest
docker run -p 3000:80 chukwuka1488/react-app:latest
docker run -p <docker expose>:<from development in github> chukwuka1488/react-app:latest

#### Create helm chart
cd /path/to/your/chart/parent/directory
helm package ./mychart
helm install myrelease ./mychart-0.1.0.tgz

Here are a few Helm commands and flags that might be helpful:

helm install --dry-run --debug1: This command simulates an install and returns the rendered manifest files. It’s a great way to see what the server would have done with your chart without actually performing the installation1.

helm get manifest1: This command shows you what templates are installed on the server1.

helm lint1: This command checks your chart for possible issues1.

helm template --debug1: This command tests rendering chart templates locally1.


1. Helm chart for Jenkins and port forward the UI
2. Flux & Github Actions
3. Github Workflows

### Prometheus EKS
https://docs.aws.amazon.com/eks/latest/userguide/prometheus.html

1. helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

2. helm install prometheus prometheus-community/prometheus --namespace prometheus --set alertmanager.persitentVolume.storageClass="gp2" --set server.persistentVolume.storageClass="gp2" --set server.service.type=LoadBalancer

3. [prometheus-server.prometheus.svc.cluster.local]

Move into the values file and apply
2. helm pull prometheus-community/prometheus 
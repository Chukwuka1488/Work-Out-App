pipeline {
    agent any

    environment {
        DOCKER_IMAGE_BACKEND = 'chukwuka1488/your-nodejs-app'
        DOCKER_IMAGE_REACT = 'chukwuka1488/your-react-app'
        DOCKER_CREDENTIALS_ID = 'Haykay_14'
        MONGO_URI = credentials('MONGO_URI') // Fetches the MongoDB URI from Jenkins credentials
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                // Navigate to backend, install its dependencies
                dir('backend') {
                    sh '''
                        npm install
                    '''
                }
                // Navigate to frontend, install its dependencies
                dir('frontend') {
                    sh '''
                        npm install
                    '''
                }
            }
        }

        stage('Docker Build and Push') {
            steps {
                echo 'Docker building and pushing....'
                script {
                    // Build and push backend image
                    def appImageBackend = docker.build(DOCKER_IMAGE_BACKEND, '--build-arg MONGO_URI=$MONGO_URI ./backend')
                    docker.withRegistry('https://registry.hub.docker.com', DOCKER_CREDENTIALS_ID) {
                        appImageBackend.push('latest')
                    }
                    
                    // Build and push frontend image
                    def appImageReact = docker.build(DOCKER_IMAGE_REACT, './frontend')
                    docker.withRegistry('https://registry.hub.docker.com', DOCKER_CREDENTIALS_ID) {
                        appImageReact.push('latest')
                    }
                }
            }
        }
    }
}
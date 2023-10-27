pipeline {
    agent any

    environment {
        DOCKER_IMAGE_BACKEND = 'chukwuka1488/your-nodejs-app'
        DOCKER_IMAGE_FRONTEND = 'chukwuka1488/your-react-app'
        DOCKER_CREDENTIALS_ID = 'Haykay_14' // Replace with your Docker Hub credentials ID
        MONGODB_URI = credentials('MONGO_URI')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Frontend Tests') {
            steps {
                dir('frontend') {
                    sh '''
                        npm install
                    '''
                }
            }
        }

        stage('Backend Tests') {
            steps {
                dir('backend') {
                    sh '''
                        npm install
                        export MONGODB_URI=$MONGODB_URI
                    '''
                }
            }
        }

        stage('Build Images') {
            steps {
                script {
                    dockerImageBackend = docker.build("${DOCKER_IMAGE_BACKEND}:$BUILD_NUMBER", './backend')
                    dockerImageFrontend = docker.build("${DOCKER_IMAGE_FRONTEND}:$BUILD_NUMBER", './frontend')
                }
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    script {
                        sh '''
                            echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
                            docker tag backend ${DOCKER_IMAGE_BACKEND}:$BUILD_NUMBER
                            docker push ${DOCKER_IMAGE_BACKEND}:$BUILD_NUMBER
                            docker tag frontend ${DOCKER_IMAGE_FRONTEND}:$BUILD_NUMBER
                            docker push ${DOCKER_IMAGE_FRONTEND}:$BUILD_NUMBER
                        '''
                    }
                }
            }
        } 
    }
}
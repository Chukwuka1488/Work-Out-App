pipeline {
    agent any

    environment {
        DOCKER_IMAGE_BACKEND = 'chukwuka1488/nodejs-app'
        DOCKER_IMAGE_FRONTEND = 'chukwuka1488/react-app'
        DOCKER_CREDENTIALS_ID = 'Haykay_14' // Replace with your Docker Hub credentials ID
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
                withCredentials([string(credentialsId: 'MONGO_URI', variable: 'MONGODB_URI')]) {
                    dir('backend') {
                        sh '''
                            npm install
                            echo MongoDB URI: "${MONGODB_URI}"
                        '''
                    }
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
                        sh """
                            echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
                            docker tag ${dockerImageBackend.id} ${DOCKER_IMAGE_BACKEND}:$BUILD_NUMBER
                            docker push ${DOCKER_IMAGE_BACKEND}:$BUILD_NUMBER
                            docker tag ${dockerImageFrontend.id} ${DOCKER_IMAGE_FRONTEND}:$BUILD_NUMBER
                            docker push ${DOCKER_IMAGE_FRONTEND}:$BUILD_NUMBER

                            # Tag the images as latest and push to DockerHub
                            docker tag ${dockerImageBackend.id} ${DOCKER_IMAGE_BACKEND}:latest
                            docker push ${DOCKER_IMAGE_BACKEND}:latest
                            docker tag ${dockerImageFrontend.id} ${DOCKER_IMAGE_FRONTEND}:latest
                            docker push ${DOCKER_IMAGE_FRONTEND}:latest
                        """
                    }
                }
            }
        } 
    }
}

pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'sns-square-solution-hub'
        DOCKER_TAG = "v${env.BUILD_ID}"
    }

    stages {
        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} -t ${DOCKER_IMAGE}:latest ."
                }
            }
        }

        stage('Security Scan') {
            steps {
                // Placeholder for security scanning tools
                echo "Running security scan on Docker image..."
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo "Deploying ${DOCKER_IMAGE}:${DOCKER_TAG}..."
                    // The production team will insert their orchestration logic here
                    // e.g. AWS ECR push, ECS restart, etc.
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline complete."
        }
        success {
            echo "Deployment successful."
        }
        failure {
            echo "Deployment failed! Please check logs."
        }
    }
}

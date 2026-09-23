pipeline {
    agent any

    tools {
        nodejs "NodeJS_22"
    }

    environment {
        /* ===============================
           AWS
        =============================== */
        AWS_REGION = "us-east-1"
        S3_BUCKET = "grcmanage.snssquare.com"
        CLOUDFRONT_DISTRIBUTION_ID = "E21GX2OMDX42L8"
        VITE_API_BASE_URL = "https://apishub.snssquare.com/"
    }

    stages {
        stage('Check Node Version') {
            steps {
                sh '''
                    echo "Node Version:"
                    node -v
                    echo "NPM Version:"
                    npm -v
                '''
            }
        }

        stage('Clean Workspace') {
            steps {
                sh '''
                    rm -rf node_modules
                    rm -rf dist
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    npm ci
                '''
            }
        }

        stage('Build React App') {
            steps {
                sh '''
                    export NODE_OPTIONS="--max-old-space-size=4096"
                    CI=false npm run build
                '''
            }
        }

        stage('Verify Build') {
            steps {
                sh '''
                    ls -lah
                    ls -lah dist
                    if [ -d "dist" ]; then
                        echo "dist directory exists. Build successful."
                    else
                        echo "dist directory not found! Build failed."
                        exit 1
                    fi
                '''
            }
        }

        stage('Upload to S3') {
            when {
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                sh '''
                    aws s3 sync dist/ s3://$S3_BUCKET/ \
                        --delete \
                        --region $AWS_REGION
                '''
            }
        }

        stage('Invalidate CloudFront') {
            when {
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                sh '''
                    aws cloudfront create-invalidation \
                        --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
                        --paths "/*"
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Successful!"
        }

        failure {
            echo "❌ Deployment Failed!"
        }

        always {
            deleteDir()
        }
    }
}

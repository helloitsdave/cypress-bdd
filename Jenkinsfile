properties(
  [
  buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '10', daysToKeepStr: '', numToKeepStr: '20')),
    parameters(
        [
          string(
            defaultValue: 'yarn cypress run',
            description: 'Tests to run. Example: yarn cypress run',
            name: 'test'
          )
        ]
      ),
  ]
)

pipeline {
  agent {
    docker {
          image 'cypress/browsers:node14.16.0-chrome89-ff86'
        }
      }

      triggers {
              cron('H 8 * * 1,3,5')
            }
  stages {
    stage('Package Installation') {
        steps {
            sh 'yarn install'
          }
    }
    stage('Run tests') {
        steps {
        sh "${params.test}"
      }
    }
  }

 post {

      always {
          archiveArtifacts artifacts: '**/videos/**,**/screenshots/**', fingerprint: true
          script {
                  summary = junit '**/results/*.xml'
                }
        }

       success {
            // Send Success Notification. 
            // Depending on the tools in use something like slackSend works well.
          }

       unstable {
            // Send Unstable Notification*
          }

       failure {
              // Send Failure Notification
      }

}

}
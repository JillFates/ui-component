def tmcontainers = [
  containerTemplate(
      name            : 'node',
      image           : 'tm-registry.transitionmanager.net/tds-ci/tm-node:latest',
      command         : 'cat',
      alwaysPullImage : true,
      ttyEnabled      : true
  ),
  containerTemplate(
        name            : 'docker',
        image           : 'tm-registry.transitionmanager.net/tds-ci/tm-docker-compose:latest',
        command         : 'cat',
        alwaysPullImage : true,
        ttyEnabled      : true
    )
]

def tmlabel = "UI-component-Build${BUILD_NUMBER}-${UUID.randomUUID().toString()}"

podTemplate (
    label: tmlabel,
    imagePullSecrets: ['tm-registry'],
    containers: tmcontainers,
    volumes: [
        hostPathVolume(hostPath: '/dev/shm', mountPath: '/dev/shm')
    ]
) {
    node(tmlabel) {
        def registry = 'tm-registry.transitionmanager.net/tds-ci'
        def name = 'ui-components'

        stage('Checkout') {
            container('node') {
                checkout scm
            }
        }

        // stage('Build for Test') {
        //     container('node') {
        //         sh "npm i"
        //     }
        // }
        //
        // stage('Test') {
        //     container('node') {
        //         sh "npm run test"
        //     }
        // }
        //
        // stage('Lint') {
        //     container('node') {
        //         sh "npm run lint"
        //     }
        // }

        // if (env.BRANCH_NAME == 'develop') {
            stage('Build image') {
                container('docker') {
                    def image = docker.build("${registry}/${name}:${env.BUILD_ID}", ".")
                }
            }

            stage('Publish') {
                container('docker') {
                    withCredentials([usernamePassword(credentialsId: 'd1920d69-59ad-45d6-b345-69c746c05794', passwordVariable: 'NEXUS_PASSWORD', usernameVariable: 'NEXUS_USER')]) {
                        sh "docker login -u $NEXUS_USER -p \"$NEXUS_PASSWORD\" ${registry}"
                    }

                    image.push("latest")
                }
            }
        // }
    }
}
